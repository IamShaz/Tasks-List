export const getLSList = JSON.parse(localStorage.getItem('tastslist'));

export const filterText = text => {
    if (/^\s/.test(text)) text = text.trim();
    if (/\s\s/.test(text)) text = text.replace(/\s{2,}/g, ' ');
    return text;
}

export const getIdFromLSList = () => {
    const lsList = JSON.parse(localStorage.getItem('tastslist'));
    let lastId = lsList && lsList[lsList.length - 1]?.id.split('-')[1];
    return lastId || 0;
}
