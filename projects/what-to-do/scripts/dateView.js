

const dateView = (() => {
    const getTaskObjsDueToday = (projects) => {
        const today = new Date(Date.now());
        const todayFormated = formatDate(today);
        let tasksDueToday = [];

        for (let project of Object.values(projects)) {
            let sublists = project.sublists;
            for (let sublist of Object.values(sublists)) {
                let tasks = sublist.tasks;
                for (let task of Object.values(tasks)) {
                    if (task.taskDueDate == todayFormated) {
                        tasksDueToday.push(task);
                    }
                }
            }
        }

        return tasksDueToday;
    }

    const getTaskObjsDueThisWeek = (projects) => {
    }

    const formatDate = (someDate) => {
        const thisYear = someDate.getFullYear().toString();
        let thisMonth = (someDate.getMonth() + 1).toString();
        let thisDay = someDate.getDate().toString();

        if (thisMonth.length < 2) {
            thisMonth = '0' + thisMonth;
        }
        if (thisDay.length < 2) {
            thisDay = '0' + thisDay;
        }

        return `${thisYear}-${thisMonth}-${thisDay}`;
    }

    return {
        getTaskObjsDueToday, 
        formatDate,
        getTaskObjsDueThisWeek
    }
})()

export default dateView