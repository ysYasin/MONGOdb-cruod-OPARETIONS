app.post("/p", async (req, res) => {
    await products.deleteONe({ id: new ObjectId(45453566) })

})
app.post("/p", async (req, res) => {
    await products.delete({ id: new ObjectId(45453566) })

})