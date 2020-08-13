const uuid = () => {
    return `xxxxxxx-xxxxxx-xxxxxxxxx-xxxx`.replace(/x/g, () => {
        return Math.floor(Math.random() * 16).toString(16);
    });
}

const getPositionElement = (element, direction) => {
    const distance = 200;
    const {x, y} = element;
    switch (direction) {
        case 'top':{
            return{
                x,
                y: y - distance
            }
        }
        case 'right':{
            return{
                x: x + distance,
                y
            }
        }
        case 'bottom':{
            return{
                x,
                y: y + distance
            }
        }
        case 'left':{
            return{
                x: x - distance,
                y
            }
        }
    }
}

const newElement = (element, direction) => {
    const {x, y} = getPositionElement(element, direction);
    return {
        id: uuid(),
        x,
        y,
        content: "<p>New Element</p><img src='public/images/AP-1SPE7X4G51W11_news.jpg'/>",
        direction: {
            top: {id: "", text: "Top"},
            right: {id: "", text: "Right"},
            bottom: {id: "", text: "Bottom"},
            left: {id: "", text: "Left"}
        }
    }
}

const findElement = (elements, id) => {
    return elements.find(element => element.id === id);
}