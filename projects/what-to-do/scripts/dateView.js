const dateView = () => {
    const getTaskObjsDueToday = projects => {
        
    }

    const todaysDate = () => {
        const today = new Date(Date.now())
        const thisYear = today.getFullYear().toString();
        let thisMonth = today.getMonth().toString();
        let thisDay = today.getDate().toString();

        if (thisMonth.length < 2) {
            thisMonth = '0' + thisMonth;
        }
        if (thisDay.length < 2) {
            thisDay = '0' + thisDay;
        }

        return `${thisYear}-${thisMonth}-${thisDay}`;
    }
}