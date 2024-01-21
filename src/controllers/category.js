exports.createCategory = (req,res,next) => {
    const name = req.body.name;
    res.json({
        message : "Category Berhasil ditambahkan",
        data: {
            name: name, 
        }
    });
    next();
}
exports.getAllCategories= (req,res, next) => {
    res.json({
        message : "Data Category Berhasil Diambil"
    });
    next();
}
exports.getCategoryById = (req,res, next) => {
    const categoryId = req.params.categoryId;
    res.json({
        message : "Data Category dengan Id " +categoryId+ " Berhasil Diambil"
    });
    next();
}
exports.updateCategory = (req,res, next) => {
    const categoryId = req.params.categoryId;
    const name = req.body.name;
    res.json({
        message : "Category dengan Id " +categoryId+" Berhasil diubah",
        data: {
            name: name, 
        }
    });
    next();
}
exports.deleteCategory = (req,res, next) => {
    const categoryId = req.params.categoryId;
    res.json({
        message : "Data Category dengan Id " +categoryId+ " Berhasil DiHapus"
    });
    next();
}