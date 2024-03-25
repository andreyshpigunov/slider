//
//	slider.js
//
//	Created by Andrey Shpigunov on 13.03.2024
//	Copyright © 2024 . All rights reserved.
//


class Slider {
    
    constructor() {
        // this.sliders = 1;
    }
    
    init() {
        let sliders = document.querySelectorAll("[data-slides]");
        if (sliders.length) {
            let slidersHash = {};
            
            sliders.forEach((e, index) => {
                try {
                    // Получает массив изображений
                    let slides = JSON.parse(e.dataset.slides);
                    // Получает обложку
                    let img = e.querySelector("img");
                    let cover = img.getAttribute("src");
                    // Добавляет обложку в начало массива
                    slides.unshift(cover);
                    // Создает массив без дублей
                    let array = [...new Set(slides)]
                    let count = array.length;
                    
                    // Добавляет данные в хэш
                    let item = {};
                    
                    item.element = e;
                    item.rect = e.getBoundingClientRect();
                    item.img = img;
                    item.array = array;
                    item.count = count;
                    
                    slidersHash[index] = item;
                    
                    // Удаляет аттрибут data-slides
                    e.removeAttribute("data-slides");
                    
                } catch (err) {
                    console.log(err);
                }
            });
            
            if (Object.keys(slidersHash).length) {
                
                Object.keys(slidersHash).forEach(i => {
                    let item = slidersHash[i];
                    
                    if (item.array.length > 1) {
                        item.element.addEventListener("mousemove", (event) => {
                            this._update(event, item);
                        });
                        item.element.addEventListener("mouseout", (event) => {
                            this._reset(event, item);
                        });
                    }
                    
                })
            }
        }
    }
    
    _update(event, item) {
        let x = event.clientX - item.rect.left;
        if (x < 0) { x = 0 }
        let slide = Math.floor(x / (item.rect.width / item.count));
        item.img.src = item.array[slide];
    }
    
    _reset(event, item) {
        item.img.src = item.array[0];
    }
    
}

const Slider = new Slider();

export default Slider;
