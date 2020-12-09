const filterSearchBar = (name, products) => {
    return products.filter(p => p.name == name)
}


module.exports = {
    filterSearchBar
}