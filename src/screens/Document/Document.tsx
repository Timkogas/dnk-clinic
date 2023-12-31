import { useNavigate } from 'react-router-dom';
import Button, { ThemeButton } from '../../components/UI/Button/Button';
import styles from './Document.module.scss'
import { useCallback, useState } from 'react';
import CopyNotification from '../../components/Copy/Copy';

const Document = () => {
    const navigate = useNavigate();

    const onBack = useCallback(() => {
        navigate("/");
    }, [navigate])

    const onEmail = () => {
        const link = 'start@freedomcode.ru'
        navigator.clipboard.writeText(link).then(() => { }).catch(() => {
            const textarea = document.createElement('textarea');
            document.body.appendChild(textarea);
            textarea.innerHTML = link;
            textarea.focus();
            textarea.select();
            document.execCommand('copy');
            textarea.remove();
            document.documentElement.scrollTop = 0;
            window.scrollTo(0, 0);

        });

        setIsVisible(true);

        setTimeout(() => {
            setIsVisible(false);
        }, 2000);
    }

    const [isVisible, setIsVisible] = useState(false);


    return (
        <>
             <CopyNotification message="Скопировано!" isVisible={isVisible} />
            <div className={styles.screen}>
                <div className={styles.block}>
                    <p>
                        Соглашение об обработке персональных данных
                        <br />
                        <br />
                        Настоящим в соответствии с Федеральным законом № 152-ФЗ «О персональных данных» от 27.07.2006 года свободно, своей волей и в своем интересе выражаю свое безусловное согласие на обработку моих персональных данных ООО «СТРАТЕГИЯ СМАРТ», зарегистрированным в соответствии с законодательством РФ по адресу: 454100, г. Челябинск, ул. Бейвеля, д. 6, кв. 138 (далее по тексту — Оператор), ОГРН 1237400005732, ИНН 7448249716.
                        <br />
                        <br />
                        Персональные данные — любая информация, относящаяся к определенному или определяемому на основании такой информации физическому лицу.
                        <br />
                        <br />
                        Настоящее Согласие выдано мною на обработку следующих персональных данных:
                        <br />
                        <br />
                        Фамилия;<br />
                        Имя;<br />
                        Отчество;<br />
                        Номер мобильного (сотового) телефона;<br />
                        Согласие дано Оператору для совершения следующих действий с моими персональными данными с использованием средств автоматизации и/или без использования таких средств: сбор, систематизация, накопление, хранение, уточнение (обновление, изменение), использование, обезличивание, а также осуществление любых иных действий, предусмотренных действующим законодательством РФ как неавтоматизированными, так и автоматизированными способами.
                        <br />
                        <br />
                        Данное согласие дается Оператору для обработки моих персональных данных в следующих целях:
                        <br />
                        <br />
                        предоставление мне услуг/работ;<br />
                        направление в мой адрес уведомлений, касающихся предоставляемых услуг/работ;<br />
                        подготовка и направление ответов на мои запросы;<br />
                        направление в мой адрес информации, в том числе рекламной, о мероприятиях/товарах/услугах/работах Оператора.<br />
                        Настоящее согласие действует до момента его отзыва путем направления соответствующего уведомления на электронный адрес <span className={styles.email} onClick={onEmail}>start@freedomcode.ru</span>. В случае отзыва мною согласия на обработку персональных данных Оператор вправе продолжить обработку персональных данных без моего согласия при наличии оснований, указанных в пунктах 2–11 части 1 статьи 6, части 2 статьи 10 и части 2 статьи 11 Федерального закона № 152-ФЗ «О персональных данных» от 26.06.2006 года
                    </p>
                    <Button theme={ThemeButton.RED} text='Назад' className={styles.btn_first} onClick={onBack} />
                </div>
            </div>
        </>
    )
};

export default Document
