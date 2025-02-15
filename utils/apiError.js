
export async function internalError() {
    return res.status(500).json({"error":"Internal Server Error"})
}