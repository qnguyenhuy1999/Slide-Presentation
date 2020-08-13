const getOppositeDirection = (direction) => {
    switch (direction) {
        case 'top': {
            return "bottom"
        }
        case 'right': {
            return "left"
        }
        case 'bottom': {
            return "top"
        }
        case 'left': {
            return "right"
        }
    }
}

const newLink = (oId, oDirect, tId, tDirect) => {
    return {
        oId,
        oDirect,
        tId,
        tDirect,
        selected: false
    }
}

const getPosLink = (element, direction) => {
    const distance = 50;
    const {x, y} = element;
    switch (direction) {
        case 'top': {
            return {
                x,
                y: y - distance
            }
        }
        case 'right': {
            return {
                x: x + distance,
                y
            }
        }
        case 'bottom': {
            return {
                x,
                y: y + distance
            }
        }
        case 'left': {
            return {
                x: x - distance,
                y
            }
        }
    }
}

const removeLink = (links, elements, element) => {
    const linkFilter = links.filter(link =>
        link.oId === element.id || link.tId === element.id
    );

    linkFilter.map(link => {
        if(link.oId === element.id){
            const tElement = findElement(elements, link.tId);
            tElement.direction[link.tDirect] = {};
        }else{
            const oElement = findElement(elements, link.oId);
            oElement.direction[link.oDirect] = {};
        }
        links.splice(links.indexOf(link), 1);
    });
}