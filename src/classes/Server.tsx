type Group = {
    id: number;
    name: string;
};
export default class Server {
    private GetShporsByLesson = async function (discipline_id: string) {
        const answer = await fetch(
            `http://shporhub/api/index.php/?method=getShporsByLesson&discipline_id=${discipline_id}`
        );
        const result = await answer.json();
        return result.data;
    };
    private GetShporByIdResponse = async function (shpor_id: string) {
        const answer = await fetch(
            `http://shporhub/api/index.php/?method=getShporsById&shpor_id=${shpor_id}`
        );
        const result = await answer.json();
        return result.data;
    };
    private GetLessonsResponce = async function () {
        const answer = await fetch(
            `http://shporhub/api/index.php/?method=getLessons&id=${localStorage.getItem(
                "id"
            )}&token=${localStorage.getItem("token")}`
        );
        const result = await answer.json();
        return result.data;
    };
    private GroupsQuery = async function () {
        const answer = await fetch(
            `http://shporhub/api/index.php/?method=getGroups`
        );
        const result = await answer.json();
        return result.data;
    };
    private ChangeInfoQuery = async function (
        groupSelect: number,
        courseSelect: number,
    ) {
        const answer = await fetch(
            `http://shporhub/api/index.php/?method=updateProfile&course=${courseSelect}
                &group=${groupSelect}
                &token=${localStorage.getItem("token")}`
        );
        const response = await answer.json();
        return response.data;
    };
    RegisterQuery = async function (
        login: string,
        password: string,
        group: string,
        course: string,
        name: string
    ) {
        const md5 = require("md5");
        const hash: string = md5(`${login}${password}`);
        const answer = await fetch(
            `http://shporhub/api/index.php/?method=registration&hash=${hash}&login=${login}&group=${group
            }&course=${course}&name=${name}`
        );
        const result = await answer.json();
        return result;
    };
    LoginResponse = async function (
        login: string,
        password: string
    ) {
        const md5 = require("md5");
        const rand: number = Math.floor(Math.random() * 1000000);
        const hash: string = md5(md5(`${login}${password}`) + rand);
        const answer = await fetch(
            `http://shporhub/api/index.php/?method=login&hash=${hash}&rand=${rand}&login=${login}`
        );
        const result = await answer.json();
        return result;
    };
    ChangeInfo = (
        groupSelect: number,
        courseSelect: number,
        setGroup: (groupId: number) => void,
        setCourse: (courseId: number) => void,
        changeLessons: () => void,
        setStyle: (bool: boolean) => void
    ) => {
        this.ChangeInfoQuery(groupSelect, courseSelect).then(value => {
            setGroup(groupSelect);
            setCourse(courseSelect);
            localStorage.setItem("course", `${courseSelect}`);
            localStorage.setItem("group", `${groupSelect}`);
            changeLessons();
            setStyle(true);
            setTimeout(() => {
                setStyle(false);
            }, 2500);
        });
    };
    SetLessonsInState = (
        setShporsByLesson: (a: []) => void,
        setLessons: (a: []) => void
    ) => {
        this.GetLessonsResponce().then((value) => {
            setShporsByLesson([]);
            if (value) {
                setLessons(value);
                return;
            }
            setLessons([]);
        });
    };
    GetGroups = (
        groups: Group[],
        setGroups: (a: []) => void
    ) => {
        if (groups.length === 0) {
            this.GroupsQuery().then(value => {
                setGroups(value);
            });
        }
    };
    SetShporsInState = (
        discipline_id: string,
        setShporsByLesson: (a: []) => void
    ) => {
        this.GetShporsByLesson(discipline_id).then((value) => {
            if (value) {
                setShporsByLesson(value);
                return;
            }
            setShporsByLesson([]);
        });
    };
    GetShporsById = (
        id: string,
        setShporImages: (a: []) => void
    ) => {
        this.GetShporByIdResponse(id).then((value) => {
            if (value) {
                setShporImages(value);
                return;
            }
            setShporImages([]);
        });
    };
    UploadShpors = (
        shporsData: 
            {
                id: number,
                Question: any,
                Answer: any
            }[]
        ,
        time: string,
        type: string,
        description: string
    ) => {
        const data = new FormData();
        for (let i = 0; i < shporsData.length; i++) {
            data.append(`questions_${shporsData[i].id}`, 
                (shporsData[i].Question) ? shporsData[i].Question : ""
            );
        }
        for (let i = 0; i < shporsData.length; i++) {
            data.append(`answers_${shporsData[i].id}`, 
                (shporsData[i].Answer) ? shporsData[i].Answer : ""
            );
        }
        fetch(
            `http://shporhub/api/index.php/?method=uploadShpora&time=${time}
                &type=${type}
                &description=${description}`,
            {
              method: "POST",
              body: data,
            }
          );
    };
};