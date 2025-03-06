// 返回顶部函数
const to_top = document.getElementById('to_top')
const container = document.querySelector('.container')
const to_Top = () => {
    to_top.addEventListener('click', function () {
        container.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    })
}

// 返回顶部显示/不显示
const to_topShow = (scrollHeight, clientHeight, scrollTop) => {
    if (scrollTop > (scrollHeight - clientHeight) / 4) {
        to_top.classList.add('show')
    } else {
        to_top.classList.remove('show')
    }
}

// svg处理函数
const svgMapHandle = () => {
    const paths = document.querySelectorAll('svg path')
    paths.forEach(function (path) {
        path.style.transition = 'all 0.5s'
        let pathId = path.getAttribute('id')
        path.addEventListener('click', () => {
            if (pathId.includes('_font')) pathId = pathId.replace('_font', '')
            if (areas.includes(pathId)) {
                localStorage.setItem('pathId', pathId)
                window.location.href = `./html/details.html`
            }
        })
        path.addEventListener('mouseenter', function () {
            paths.forEach(function (item_path) {
                item_path.style.fill = '#dec4ad'
            })
            let pathCat = `${pathId}_font`
            path.style.fill = '#ffe7c0'
            document.getElementById(pathCat).style.fill = 'rgb(78, 47, 22)'
        })
        path.addEventListener('mouseout', function () {
            paths.forEach(function (path) {
                if (pathId.includes('_font')) path.style.zIndex = '100'
                path.style.fill = path.getAttribute('fill')
            })
        })
    })
}

const herbs = [
    "大黄",
    "天麻",
    "三七",
    "冬虫夏草",
    "秦艽",
    "羌活",
    "川贝母",
    "葛根",
    "熊胆",
    "羊肚菌",
    "银耳",
    "木瓜",
    "乌药",
    "石菖蒲",
    "云木香",
    "钩藤",
    "丹参",
    "白芍",
    "白芥子",
    "车前子",
    "鱼腥草",
    "僵蚕",
    "附子",
    "川楝子",
    "麦冬",
    "厚朴",
    "辛夷",
    "桔梗",
    "陈皮",
    "薄荷",
    "金钱草",
    "骨碎补",
    "黄柏",
    "乌梅",
    "花椒",
    "白术",
    "何首乌",
    "郁金",
    "佛手",
    "黄连",
    "生姜",
    "重楼",
    "仙茅",
    "黄精"
]

const herbsByRegion = {
    "阿坝": [
        "大黄",
        "天麻",
        "三七",
        "冬虫夏草"
    ],
    "甘孜": [
        "秦艽",
        "羌活",
        "川贝母"
    ],
    "成都": [
        "葛根",
        "熊胆",
        "羊肚菌"
    ],
    "巴中": [
        "银耳",
        "木瓜",
        "乌药"
    ],
    "达州": [
        "石菖蒲",
        "云木香",
        "钩藤"
    ],
    "德阳": [
        "丹参",
        "白芍",
        "白芥子",
        "车前子",
        "鱼腥草"
    ],
    "凉山": [
        "僵蚕",
        "附子",
        "川楝子"
    ],
    "绵阳": [
        "麦冬",
        "厚朴",
        "辛夷",
        "桔梗"
    ],
    "南充": [
        "陈皮",
        "薄荷",
        "金钱草",
        "骨碎补"
    ],
    "雅安": [
        "黄柏",
        "乌梅",
        "花椒",
        "白术"
    ],
    "攀枝花": [
        "何首乌"
    ],
    "乐山": [
        "郁金",
        "佛手",
        "黄连",
        "生姜",
        "重楼"
    ],
    "宜宾": [
        "仙茅",
        "黄精"
    ]
}

const areas = [
    "阿坝",
    "甘孜",
    "成都",
    "巴中",
    "达州",
    "德阳",
    "凉山",
    "绵阳",
    "南充",
    "雅安",
    "攀枝花",
    "乐山",
    "宜宾"
]

// 弹幕效果
let currentNum = 1
const createDanmu = () => {
    const danmu = document.createElement('div')
    danmu.classList.add('scrolling_item')
    danmu.style.zIndex = 100
    danmu.textContent = herbs[Math.floor(Math.random() * herbs.length)]
    danmu.style.fontSize = `${Math.floor(Math.random() * 6 + 6)}vh`
    danmu.style.left = `${window.innerWidth}px`
    const scrollingContainer = document.querySelector('.scrolling')
    let randomNum = Math.floor(Math.random() * 9) - 1

    if (randomNum === currentNum) randomNum = 1
    else currentNum = randomNum

    if (randomNum === 3) randomNum = 1
    else if (randomNum === 4) randomNum = 2
    else if (randomNum === 5) randomNum = 6
    danmu.style.top = `${randomNum * Math.floor(100 / 9)}vh`
    scrollingContainer.appendChild(danmu)
    danmu.style.transition = `transform 15000ms linear`
    danmu.style.color = "rgb(95, 82, 66)"
    setTimeout(() => {
        danmu.style.transform = `translateX(-${window.innerWidth + danmu.offsetWidth}px)`
    }, 0)
    danmu.addEventListener('transitionend', function () {
        danmu.remove()
    })
}

// 页内导航 
const lis = document.querySelectorAll('.bar li')
const navHandle = () => {
    lis.forEach(function (li) {
        let liId = li.className.split('').pop()
        if (liId == '1' || liId == '2' || liId == '3' || liId == '4' || liId == '5') {
            liId = parseInt(liId) - 1
            const a = li.querySelector('a')
            a.addEventListener('click', function () {
                const targetTop = liId
                container.scrollTo({
                    top: targetTop * window.innerHeight,
                    behavior: 'smooth'
                })
            })
        }
    })
}

// 监听滚动和触发事件
const listenScroll = () => {
    container.addEventListener('scroll', function () {
        let scrollHeight = container.scrollHeight
        let clientHeight = container.clientHeight
        let scrollTop = container.scrollTop
        to_topShow(scrollHeight, clientHeight, scrollTop)
    })
}

// 启动弹幕循环
let createDame
const startDanmuLoop = () => {
    createDame = setInterval(createDanmu, 350)
}

// 打开地图
let isOpen = false
const openMap = () => {
    const scrolling = document.querySelector('.scrolling')
    const enter = document.querySelector('.scrolling_logo')
    const openMap = document.getElementById('openMap')
    const danmus = document.querySelectorAll('.scrolling_item')
    const header = document.querySelector('.header')
    const attention = document.getElementById('attention')
    const cate = document.querySelector('.cate')
    enter.addEventListener('click', function () {
        isOpen = true
        scrolling.classList.add('hideScrolling')
        setTimeout(() => {
            scrolling.style.display = 'none'
            scrolling.remove()
            cate.classList.add('cateIn')
            header.classList.add('headerIn')
            attention.classList.add('attentionIn')
            clearInterval(createDame)
            danmus.forEach((danmu) => {
                danmu.remove()
            })
        }, 1000)
    })
    openMap.addEventListener('click', function () {
        isOpen = true
        scrolling.classList.add('hideScrolling')
        setTimeout(() => {
            scrolling.style.display = 'none'
            scrolling.remove()
            cate.classList.add('cateIn')
            header.classList.add('headerIn')
            attention.classList.add('attentionIn')
            clearInterval(createDame)
            danmus.forEach((danmu) => {
                danmu.remove()
            })
        }, 1000)
    })
}

// 图片高斯
const imgHandle = () => {
    const texts = document.querySelectorAll('.content_text')
    const left_img = document.querySelector('.left_img_box_item')
    const center_img = document.querySelector('.center_img_box_item')
    const right_img = document.querySelector('.right_img_box_item')
    texts.forEach((text) => {
        text.addEventListener('mouseover', function () {
            if (text.id == '01_text') {
                left_img.style.filter = 'blur(8px)'
            } else if (text.id == '02_text') {
                center_img.style.filter = 'blur(8px)'
            } else if (text.id == '03_text') {
                right_img.style.filter = 'blur(8px)'
            }
        })
        text.addEventListener('mouseout', function () {
            if (text.id == '01_text') {
                left_img.style.filter = 'blur(0px)'
            } else if (text.id == '02_text') {
                center_img.style.filter = 'blur(0px)'
            } else if (text.id == '03_text') {
                right_img.style.filter = 'blur(0px)'
            }
        })
    })
}

// cate_imghandle
const cate_imgHandle = () => {
    const names = document.querySelectorAll('.name')
    names.forEach((name, index) => {
        name.addEventListener('mouseover', function () {
            names[index].style.opacity = 1
            names[index].style.backgroundColor = 'rgba(205, 190, 172, 0.7)'
        })
        name.addEventListener('mouseout', function () {
            names[index].style.opacity = 0
        })
    })
}

// 跳转
const to_index = () => {
    const logo = document.querySelector('.logo')
    logo.addEventListener('click', function () {
        window.location.href = 'index.html'
    })
}

// cate目录显示隐藏
const cateUl = document.querySelector('.cate_ul')
const toggleCateUl = () => {
    if (cateUl.style.display === 'none' || cateUl.style.display === '') {
        cateUl.style.display = 'block'
        cateUl.classList.add('cate_ul_in')
    } else {
        cateUl.style.display = 'none'
    }
}

// ul_li跳转
const li_to = () => {
    const lis = document.querySelectorAll('.cate_ul li')
    lis.forEach((li) => {
        const to_city = li.textContent
        li.addEventListener('click', () => {
            localStorage.setItem('pathId', to_city)
            // 跳转到details.html页面
            window.location.href = `./html/details.html`
        })
    })
}

// 对应地图变色
const svgWithLiHandle = () => {
    const paths = document.querySelectorAll('.svgMap path')
    const lis = document.querySelectorAll('.cate_ul li')
    lis.forEach((li) => {
        const to_city = li.textContent
        li.addEventListener('mouseenter', () => {
            paths.forEach((path) => {
                path.style.fill = '#dec4ad'
            })
            paths.forEach((path) => {
                if (path.id == to_city) {
                    path.style.fill = '#ffe7c0'
                    const pathCat = `${path.id}_font`
                    document.getElementById(pathCat).style.fill = 'rgb(78, 47, 22)'
                }
            })
        })
        li.addEventListener('mouseout', () => {
            paths.forEach((path) => {
                path.style.fill = path.getAttribute('fill')
            })
        })
    })
}

// li变色
const handleScrollBackground = () => {
    const container = document.querySelector('.container')
    const lis = document.querySelectorAll('.bar>li')
    const firstA = lis[1].querySelector('a')
    firstA.classList.add('barLI')
    firstA.style.color = "#7c522c"

    container.addEventListener('scroll', () => {
        let scrollTop = container.scrollTop

        for (let i = 1; i <= 5; i++) {
            const a = lis[i].querySelector('a')
            if (scrollTop == (i - 1) * window.innerHeight) {
                a.classList.add('barLI')
                a.style.color = "#7c522c"
            } else {
                a.classList.remove('barLI')
                a.style.color = "#847263"
            }
        }
    })
}

// search
const searchHerbs = () => {
    const Input = document.getElementById('search_input')
    const res = document.getElementById('res')
    Input.addEventListener('focus', () => {
        res.style.opacity = 1
    })
    Input.addEventListener('blur', () => {
        res.style.opacity = 0
    })
    Input.addEventListener('input', () => {
        const value = Input.value
        res.innerHTML = ''
        herbs.forEach((herb) => {
            if (herb.includes(value)) {
                const li = document.createElement('li')
                li.textContent = herb
                res.appendChild(li)
                res_li_to()
            }
        })
    })
}

// getCityByHerb
const getCityByHerb = (herb) => {
    for (const city in herbsByRegion) {
        if (herbsByRegion[city].includes(herb)) {
            return city
        }
    }
    return null
}

// res_li跳转：
const res_li_to = () => {
    const res_lis = document.querySelectorAll('.search_res li')
    res_lis.forEach((li) => {
        const herb = li.textContent.trim()
        li.addEventListener('click', () => {
            const city = getCityByHerb(herb)
            localStorage.setItem('pathId', city)
            window.location.href = `./html/details.html`
        })
    })
}

// 阻止鼠标滚动的函数
function preventMouseWheel(event) {
    if (!isOpen) {
        event.preventDefault();
    }
}

// Dom加载完成后执行的函数
document.addEventListener('DOMContentLoaded', () => {
    // 滚动监听和事件
    listenScroll()
    // 监听鼠标滑动
    openMap()
    // svgmap事件
    svgMapHandle()
    // 字体弹幕
    startDanmuLoop()
    // 图片高斯
    imgHandle()
    // 返回首页
    to_index()
    // cate_imghandle
    cate_imgHandle()
    // to_Top
    to_Top()
    // 页内导航
    navHandle()
    // 隐藏cate_ul
    const cateUl = document.querySelector('.cate_ul')
    cateUl.style.display = 'none'
    // li跳转
    li_to()
    // svg地图变色
    svgWithLiHandle()
    // li变色
    handleScrollBackground()
    // search
    searchHerbs()
    // search结果跳转
    res_li_to()
})
document.addEventListener('wheel', preventMouseWheel, { passive: false });