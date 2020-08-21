const checkName = (name) => {
    if (name.length < 6)
        return false;
    return true;
}

const checkEmail = (email) => {
    if (email.search('@') === -1 || email.search('.') === -1)
        return false;
    return true;
}

const checkPasswordOrProduct = (item) => {
    if (item.length < 6 || item.toLowerCase() === item)
        return false;
    return true;
}

export const validateUser = (name, email, password) => {
    let err = {};
    if (!checkName(name)) err['name'] = "Подсказка: введите Ваше полное имя";
    if (!checkEmail(email)) err['email'] = "Подсказка: введите верный email";
    if (!checkPasswordOrProduct(password)) err['password'] = "Пароль должен состоять из 6 символов и заглавной буквы";
    return err;
}

export const validateProduct = (name) => {
    let err = '';
    if (!checkPasswordOrProduct(name)) err = "Название товара должно состоять из 6 символов и заглавной буквы";
    return err;
}