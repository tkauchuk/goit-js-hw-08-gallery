const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const refs = {
  gallery: document.querySelector('.js-gallery'),
  modalBox: document.querySelector('.js-lightbox'),
  modalBoxBackdrop: document.querySelector('.lightbox__overlay'),
  modalBoxImage: document.querySelector('.lightbox__image'),
  modalBoxCloseBtn: document.querySelector('.lightbox__button'),
};

function createGalleryMarkup(images) {
  return images
    .map(({ original, preview, description }) => {
      return `<li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        loading="lazy"
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
              </li>`
    })
    .join('');
};

const galleryMarkup = createGalleryMarkup(galleryItems);
refs.gallery.insertAdjacentHTML('beforeend', galleryMarkup);
refs.galleryItems = document.querySelectorAll('.gallery__image');



refs.gallery.addEventListener('click', onGalleryItemClick);
refs.modalBoxBackdrop.addEventListener('click', onBackdropClick);
refs.modalBoxCloseBtn.addEventListener('click', onModalBoxClose);
window.addEventListener('keydown', onEscapeKeyPress);



function onGalleryItemClick(event) {

  event.preventDefault();
  
  if (event.target.nodeName !== 'IMG') {
    return;
  };
  
  onModalBoxOpen();
  setModalBoxImageSource(event.target.dataset.source);
  setModalBoxImageDescription(event.target.alt);
  
  const isModalBoxOpen = refs.modalBox.classList.contains('is-open');

  if (isModalBoxOpen) {
    let currentIndex = getCurrentModalBoxImageIndex(event.target);

    window.addEventListener('keydown', (event) => {
      
      if (event.code === 'ArrowRight') {
        if (currentIndex === refs.galleryItems.length - 1) {
          return;
        }
        currentIndex += 1;
        refs.modalBoxImage.src = refs.galleryItems[currentIndex].dataset.source;
      }
      if (event.code === 'ArrowLeft') {
        if (currentIndex === 0) {
          return;
        }
        currentIndex -= 1;
        refs.modalBoxImage.src = refs.galleryItems[currentIndex].dataset.source;
      }
    });
    
  } 
};

function onModalBoxOpen() {
  refs.modalBox.classList.add('is-open');
};

function onModalBoxClose() {
  refs.modalBox.classList.remove('is-open');
  refs.modalBoxImage.src = '';
  refs.modalBoxImage.alt = '';
};


function onEscapeKeyPress(event) {
  if (event.code === 'Escape') {
    onModalBoxClose();
  }
};

function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    onModalBoxClose();
  }
};

function setModalBoxImageSource(source) {
  refs.modalBoxImage.src = source;
};

function setModalBoxImageDescription(description) {
  refs.modalBoxImage.alt = description;
};

function getCurrentModalBoxImageIndex(image) {
  let modalBoxImageIndex = [].indexOf.call(refs.galleryItems, image);
  return modalBoxImageIndex;
};

