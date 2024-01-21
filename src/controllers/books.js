exports.createbook = (req,res,next) => {
    const title = req.body.title;
    const description = req.body.description;
    const release_year = req.body.release_year;
    const price = req.body.price;
    const total_page = req.body.total_page;
    let thickness
    if(total_page <= 100){
        thickness = "tipis";
    }else if(total_page >= 201){
        thickness = "tebal";
    }else if(total_page >= 101 && total_page <= 200){
        thickness = "sedang";
    }
    res.json({
        message : "Buku Berhasil ditambahkan",
        data: {
            title: title, 
            description: description,
            image_url : "/images/books",
            release_year : release_year,
            price: price,
            total_page: total_page,
            thickness: thickness,
            category_id: 1
        }
    });
    next();
}
exports.getAllBooks= (req,res, next) => {
    res.json({
        message : "Data Buku Berhasil Diambil"
    });
    next();
}