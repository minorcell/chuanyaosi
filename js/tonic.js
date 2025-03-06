function returnIndex() {
    const index = document.querySelector('.diet')
    index.addEventListener('click', () => {
        window.location.href = `../index.html`
    })
}
document.addEventListener('DOMContentLoaded', () => {
    returnIndex()
})