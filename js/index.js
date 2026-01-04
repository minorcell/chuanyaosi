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
    const paths = document.querySelectorAll('.svgMap path')
    paths.forEach(function (path) {
        path.style.transition = 'all 0.5s'
        const pathId = path.getAttribute('id')
        const areaId = pathId.includes('_font') ? pathId.replace('_font', '') : pathId
        path.addEventListener('click', () => {
            if (areas.includes(areaId)) {
                localStorage.setItem('pathId', areaId)
                window.location.href = `./html/details.html`
            }
        })
        path.addEventListener('mouseenter', function () {
            highlightArea(areaId)
        })
        path.addEventListener('mouseout', resetActiveArea)
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

// SVG 缓存与高亮状态
const mapElements = {
    areas: new Map(),
    labels: new Map(),
    areaDefaultFill: new Map(),
    labelDefaultFill: new Map(),
    activeId: null
}

const addMapItem = (map, key, value) => {
    if (!map.has(key)) map.set(key, [])
    map.get(key).push(value)
}

const cacheMapElements = () => {
    document.querySelectorAll('.svgMap path').forEach((path) => {
        const isLabel = path.id.includes('_font')
        const baseId = isLabel ? path.id.replace('_font', '') : path.id
        addMapItem(isLabel ? mapElements.labels : mapElements.areas, baseId, path)
        if (isLabel) {
            mapElements.labelDefaultFill.set(path, path.getAttribute('fill'))
        } else {
            mapElements.areaDefaultFill.set(path, path.getAttribute('fill'))
        }
    })
}

const resetActiveArea = () => {
    if (!mapElements.activeId) return
    const areaPaths = mapElements.areas.get(mapElements.activeId) || []
    const labelPaths = mapElements.labels.get(mapElements.activeId) || []

    areaPaths.forEach((path) => {
        path.style.fill = mapElements.areaDefaultFill.get(path)
    })
    labelPaths.forEach((label) => {
        label.style.fill = mapElements.labelDefaultFill.get(label)
    })
    mapElements.activeId = null
}

const highlightArea = (areaId) => {
    if (!areaId) return
    if (mapElements.activeId === areaId) return
    resetActiveArea()

    const areaPaths = mapElements.areas.get(areaId)
    if (!areaPaths || areaPaths.length === 0) return
    const labelPaths = mapElements.labels.get(areaId) || []

    mapElements.activeId = areaId
    areaPaths.forEach((path) => {
        path.style.fill = '#ffe7c0'
    })
    labelPaths.forEach((label) => {
        label.style.fill = 'rgb(78, 47, 22)'
    })
}

// 弹幕效果
let currentNum = 1
let danmuTimer = null
const MAX_DANMU_COUNT = 12
const DANMU_INTERVAL = 1200
const createDanmu = () => {
    const scrollingContainer = document.querySelector('.scrolling')
    if (!scrollingContainer) return
    if (scrollingContainer.childElementCount >= MAX_DANMU_COUNT) return

    const danmu = document.createElement('div')
    danmu.classList.add('scrolling_item')
    danmu.style.zIndex = 100
    danmu.textContent = herbs[Math.floor(Math.random() * herbs.length)]
    danmu.style.fontSize = `${Math.floor(Math.random() * 6 + 6)}vh`
    danmu.style.left = `${window.innerWidth}px`
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
    requestAnimationFrame(() => {
        danmu.style.transform = `translateX(-${window.innerWidth + danmu.offsetWidth}px)`
    })
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
    }, { passive: true })
}

// 启动弹幕循环
const startDanmuLoop = () => {
    if (danmuTimer) return
    danmuTimer = setInterval(() => {
        requestAnimationFrame(createDanmu)
    }, DANMU_INTERVAL)
}

const stopDanmuLoop = () => {
    if (!danmuTimer) return
    clearInterval(danmuTimer)
    danmuTimer = null
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
            stopDanmuLoop()
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
            stopDanmuLoop()
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
    const lis = document.querySelectorAll('.cate_ul li')
    lis.forEach((li) => {
        const to_city = li.textContent
        li.addEventListener('mouseenter', () => {
            highlightArea(to_city)
        })
        li.addEventListener('mouseout', () => {
            resetActiveArea()
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

    let ticking = false
    container.addEventListener('scroll', () => {
        if (ticking) return
        ticking = true
        requestAnimationFrame(() => {
            let scrollTop = container.scrollTop

            for (let i = 1; i <= 5; i++) {
                const a = lis[i].querySelector('a')
                if (Math.abs(scrollTop - (i - 1) * window.innerHeight) < 2) {
                    a.classList.add('barLI')
                    a.style.color = "#7c522c"
                } else {
                    a.classList.remove('barLI')
                    a.style.color = "#847263"
                }
            }
            ticking = false
        })
    }, { passive: true })
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

// 渲染并跳转的搜索逻辑
const renderSearchResults = (value) => {
    const res = document.getElementById('res')
    res.innerHTML = ''

    if (!value) return

    const fragment = document.createDocumentFragment()
    herbs.forEach((herb) => {
        if (herb.includes(value)) {
            const li = document.createElement('li')
            li.textContent = herb
            fragment.appendChild(li)
        }
    })
    res.appendChild(fragment)
}

const searchHerbs = () => {
    const Input = document.getElementById('search_input')
    const res = document.getElementById('res')
    let inputTimer

    Input.addEventListener('focus', () => {
        res.style.opacity = 1
    })
    Input.addEventListener('blur', () => {
        res.style.opacity = 0
    })
    Input.addEventListener('input', () => {
        clearTimeout(inputTimer)
        inputTimer = setTimeout(() => {
            renderSearchResults(Input.value.trim())
        }, 150)
    })

    res.addEventListener('click', (event) => {
        const target = event.target.closest('li')
        if (!target) return
        const herb = target.textContent.trim()
        const city = getCityByHerb(herb)
        if (city) {
            localStorage.setItem('pathId', city)
            window.location.href = `./html/details.html`
        }
    })
}

// 图片懒加载
const optimizeImages = () => {
    const lazyCandidates = document.querySelectorAll('img')
    lazyCandidates.forEach((img) => {
        if (img.closest('.loading')) return
        if (img.hasAttribute('loading')) return
        img.setAttribute('loading', 'lazy')
        img.setAttribute('decoding', 'async')
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
    // 缓存SVG信息
    cacheMapElements()
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
    // image lazy loading
    optimizeImages()
})
document.addEventListener('wheel', preventMouseWheel, { passive: false });
