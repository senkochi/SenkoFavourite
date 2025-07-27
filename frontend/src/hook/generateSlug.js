function generateSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD') // Loại bỏ dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '') // Loại bỏ ký tự đặc biệt
    .trim()
    .replace(/\s+/g, '-') // Thay khoảng trắng bằng dấu gạch ngang
    .replace(/-+/g, '-'); // Loại bỏ gạch ngang thừa
}

export default generateSlug;