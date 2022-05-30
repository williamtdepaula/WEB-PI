export function getGroupRiskTreated(groupRisk: string | undefined) {
    return groupRisk ? groupRisk.replace(',', ', ') : '';
}

export function getGender(gender: string) {
    if (gender === 'N') return 'Prefiro não dizer';
    if (gender === 'M') return 'Masculino';
    return 'Feminino';
}

export function getDateFromTimestamp(timestamp: string) {
    let date = new Date(timestamp);

    date.setUTCHours(3)

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let dayTreated = day < 10 ? `0${day}` : day
    let monthTreated = month < 10 ? `0${month}` : month

    return `${dayTreated}/${monthTreated}/${year}`
}

export function getBestTimeToContact(charBestTime: String) {
    return charBestTime === "T" ? "Tarde" : "Manhã"
}

export function treatAddress(houseNumber: string, street: string, disctrict: string, city: string) {
    return `${houseNumber}, ${street}, ${disctrict}, ${city}` 
}