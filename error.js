export const handleErrors = (error, buttonElement) => {
    buttonElement.disabled = false;
    buttonElement.textContent = "Написать";
    
    const errorMessage = error.message;

    if (errorMessage.startsWith("BadRequest:")) {
        alert('Некорректные данные. Пожалуйста, заполните все поля и проверьте правильность введенной информации.');
    } else if (errorMessage.startsWith("ServerUnavailable:")) {
        alert('Сервер временно не работает. Попробуйте позднее.');
    } else if (errorMessage.startsWith("ServerError:") || errorMessage.startsWith("Error:")) {
        alert('Кажется что-то пошло не так. Попробуйте позже.');
    } else {
        alert('Неизвестная ошибка. Попробуйте еще раз.');
    }
    console.warn(error);
};