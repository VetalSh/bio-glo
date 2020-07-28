const onlineConstructor = () => {
  const accordion = document.getElementById('accordion'),
        headingOne = document.getElementById('headingOne'),
        headingTwo = document.getElementById('headingTwo'),
        headingThree = document.getElementById('headingThree'),
        headingFour = document.getElementById('headingFour'),
        collapseOne = document.getElementById('collapseOne'),
        collapseTwo = document.getElementById('collapseTwo'),
        collapseThree = document.getElementById('collapseThree'),
        collapseFour = document.getElementById('collapseFour');
  let arrayPanel = [collapseOne, collapseTwo, collapseThree, collapseFour];

  const deletePanel = () => {
    arrayPanel.forEach((item) => {
      item.classList.remove('in');
    });    
  };
  
  accordion.addEventListener('click', (event) => {
    event.preventDefault();
    let target = event.target;         
    let target1 = target.closest('.panel-heading'); // Для переключения по заголовкам
    let target2 = target.closest('.construct-btn'); // Для переключения по кнопкам
    
    if (target2) {
      target2 = target2.getAttribute('href');
    }

    if (target1 === headingOne) {
      deletePanel();
      collapseOne.classList.add('in');
    } else if (target1 === headingTwo || target2 === '#collapseTwo') {
      deletePanel();
      collapseTwo.classList.add('in');
    } else if (target1 === headingThree || target2 === '#collapseThree') {
      deletePanel();
      collapseThree.classList.add('in');
    } else if (target1 === headingFour || target2 === '#collapseFour') {
      deletePanel();
      collapseFour.classList.add('in');
    }
  });  
};

export default onlineConstructor;