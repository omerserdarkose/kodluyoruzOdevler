// Id, title, category, price, img ve desc
const menu = [
    {
        id: 0,
        title: "LOREM",
        category: "A",
        price: "8.99",
        img: "https://picsum.photos/id/88/200/200",
        desc: "Lorem ipsum dolor sit amet.",
    },
    {
        id: 1,
        title: "IPSUM",
        category: "B",
        price: "5.99",
        img: "https://picsum.photos/id/1/200/200",
        desc: "Lorem ipsum dolor sit amet.",
    },
    {
        id: 2,
        title: "lorem",
        category: "C",
        price: "6.9",
        img: "https://picsum.photos/id/22/200/200",
        desc: "Lorem ipsum dolor sit amet.",
    },
    {
        id: 3,
        title: "lorem",
        category: "B",
        price: "89.99",
        img: "https://picsum.photos/id/38/200/200",
        desc: "Lorem ipsum dolor sit amet.",
    },
    {
        id: 4,
        title: "lorem",
        category: "A",
        price: "69.99",
        img: "https://picsum.photos/id/14/200/200",
        desc: "Lorem ipsum dolor sit amet.",
    },
    {
        id: 5,
        title: "lorem",
        category: "D",
        price: "49.99",
        img: "https://picsum.photos/id/5/200/200",
        desc: "Lorem ipsum dolor sit amet.",
    },
    {
        id: 6,
        title: "lorem",
        category: "A",
        price: "19.99",
        img: "https://picsum.photos/id/67/200/200",
        desc: "Lorem ipsum dolor sit amet.",
    },
    {
        id: 7,
        title: "lorem",
        category: "D",
        price: "29.99",
        img: "https://picsum.photos/id/7/200/200",
        desc: "Lorem ipsum dolor sit amet.",
    },
    {
        id: 8,
        title: "lorem",
        category: "C",
        price: "39.99",
        img: "https://picsum.photos/id/81/200/200",
        desc: "Lorem ipsum dolor sit amet.",
    },
];

const btnContainer = document.querySelector(".btn-container");
const section = document.querySelector(".section-center");
const btn = document.querySelectorAll(".btn-item");

//tum menu listesi geziliyor reduce fonksiyonu ile categori isimleri toplaniyor, reduce fonk. baslangic degeri olarak da 'All' verilip categori olarak listeye dahil ediliyor
const categoryNames = menu.reduce(
    (catgList, item) => {
        if (!catgList.includes(item.category)) {
            catgList.push(item.category.toUpperCase());
        }
        return catgList;
    },
    ["All"]
);

//her kategori ismine ait buton elementleri olusturlup html icine ekleniyor
const btnHTML = categoryNames.map((item) => {
        return `<button type="button" class="btn btn-outline-secondary btn-item">${item}</button>`;
    }).join("");

btnContainer.innerHTML = btnHTML;


//butonlari tasiyan div'e ulasilip her bir buton icin iceriginde yazan kategori ismine gore menu listesi filtreleniyor. ve liste ekranda gosterilmesi icin menuShow fonksiyonuna gonderiliyor
btnContainer.childNodes.forEach((value) => {
    if (value.nodeType == 1) {
        value.addEventListener("click", () => {
            if (value.textContent == "All") {
                menuShow(menu);
            } else {
                menuShow(
                    menu.filter((item) => {
                        if (item.category == value.textContent) {
                            return item;
                        }
                    })
                );
            }
        });
    }
});

function menuShow(catgName) {
    const catgHTML = catgName
        .map((item) => {
            return `<div class="menu-items col-lg-6 col-sm-12">
            <img
              src=${item.img}
              alt=${item.title}
              class="photo"
            />
            <div class="menu-info">
              <div class="menu-title">
                <h4>${item.title}</h4>
                <h4 class="price">${item.price}</h4>
              </div>
              <div class="menu-text">
                ${item.desc}
              </div>
            </div>
          </div>`;
        })
        .join("");
    section.innerHTML = catgHTML.toString();
}
menuShow(menu);
