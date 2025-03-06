// loading效果
const loading = {
    container: document.querySelector('.loading'),
    out() {
        this.container.classList.remove('loading_in')
        setTimeout(() => {
            this.container.classList.add('loading_out')
        }, 500)
        setTimeout(() => {
            document.querySelector('body').removeChild(this.container)
        }, 2000)
    },
    in() {
        this.container.classList.remove('loading_out')
        this.container.classList.add('loading_in')
    }
}
window.addEventListener('load', () => {
    const flag = sessionStorage.getItem('have_loading')
    if (flag) loading.out()
    else {
        sessionStorage.setItem('have_loading', true)
        loading.in()
        setTimeout(() => {
            loading.out()
            localStorage.setItem('have_loading', true)
        }, 2000)
    }
})