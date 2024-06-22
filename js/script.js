
const canvas = document.querySelector("canvas"),
    toolBtns = document.querySelectorAll(".tool"),
    fillColor = document.querySelector("#fill-color")

let ctx = canvas.getContext("2d"),
    isDrawing = false,
    brushWidth = 3,
    selectedTool = "brush",
    prevMouseX,
    prevMouseY,
    snapshot

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
})

console.log(selectedTool);

const startDrawing = (e) => {
    console.log(fillColor.checked);
    isDrawing = true
    prevMouseX = e.offsetX
    prevMouseY = e.offsetY
    ctx.beginPath()
    ctx.lineWidth = brushWidth
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height)
    console.log(snapshot);
}

const stopDrawing = () => {
    isDrawing = false;
}

const drawReactangle = (e) => {
    if (fillColor.checked) {
        return ctx.fillRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
    }
    ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX - e.offsetX, prevMouseY - e.offsetY)
}
const drawCircle = (e) => {
    ctx.beginPath();
    const radius = Math.sqrt(Math.pow())
    ctx.arc(prevMouseX, prevMouseY, 50, 0, 2 * Math.PI)
    ctx.stroke()
}

const drawing = e => {
    if (!isDrawing) return
    ctx.putImageData(snapshot, 0, 0)
    switch (selectedTool) {
        case 'brush':
            ctx.lineTo(e.offsetX, e.offsetY)
            ctx.stroke()
            break;
        case 'rectangle': drawReactangle(e)
        default:
            break;
        case 'circle': drawCircle(e)
            break;
    }

}



toolBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector(".options .active").classList.remove("active")
        btn.classList.add("active")
        selectedTool = btn.id
        console.log(selectedTool);
    })
})


canvas.addEventListener("mousedown", startDrawing)

canvas.addEventListener('mousemove', drawing)

canvas.addEventListener("mouseup", stopDrawing)