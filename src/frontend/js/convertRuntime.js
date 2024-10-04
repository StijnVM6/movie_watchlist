const convertRuntime = (runtime) => {
    let timeStr = runtime;

    // remove "min" at the end
    if (runtime.endsWith("min")) {
        timeStr = runtime.substring(0, runtime.length - 3);
        timeStr = timeStr.trim();
    }

    // convert minutes to hour and minutes
    let minutes = Number(timeStr);
    let hours = 0;
    while (minutes >= 60) {
        minutes = minutes % 60;
        hours++;
    }
    const time = `${hours}h${minutes}`;

    return time;
};

export default convertRuntime;