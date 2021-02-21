import myName from './myName';

function component() {
    const element = document.createElement('div');

    element.innerHTML = myName('Zsolt');
    
    return element;
}

document.body.appendChild(component());