const questions = () => {
  const accordionTwo = document.getElementById('accordion-two'),
        headingOne = document.getElementById('headingOne-two'),
        headingTwo = document.getElementById('headingTwo-two'),
        headingThree = document.getElementById('headingThree-two'),
        collapseOne = document.getElementById('collapseOne-two'),
        collapseTwo = document.getElementById('collapseTwo-two'),
        collapseThree = document.getElementById('collapseThree-two');
  let arrayPanel = [collapseOne, collapseTwo, collapseThree];

  const deletePanel = () => {
    arrayPanel.forEach((item) => {
      item.classList.remove('in');
    });    
  };

  accordionTwo.addEventListener('click', (event) => {
    event.preventDefault();
    let target = event.target;
    target = target.closest('.panel-heading');

    if (target === headingOne) {
      deletePanel();
      collapseOne.classList.add('in');
    } else if (target === headingTwo) {
      deletePanel();
      collapseTwo.classList.add('in');
    } else if (target === headingThree) {
      deletePanel();
      collapseThree.classList.add('in');
    }
  });
};

export default questions;