export const getMeteoByDay = (arrayList) => {

    return arrayList.reduce((acc, elt) => {
        let key = new Date(elt.dt_txt).getDate()
        if (!acc[key])
            acc[key] = []
        acc[key].push(elt)

        return acc
    }, []).filter(val => val)
}