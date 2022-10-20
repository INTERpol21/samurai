import React, {FC} from 'react';
import style from './About.module.css';

const About: FC = () => {

    return (

        <div className={style.newsBlock}>

            <div>
                Мой ник
                interpol21
                <br/>
                Мой ID
                - 25994
            </div>

            <div>
                <br/>
                Можно открыть в новой вкладке:
            </div>

            <div>

                <p>
                    <a
                        href="https://interpol21.github.io/samurai/#/profile/25994"
                        target="_blank"
                        rel="noreferrer"

                    >
                        Ссылку на мой профиль на этом сайта
                    </a>
                </p>


                <div>
                    Дорогие гости, работодатели, Hr и все кому интересен этот проект
                </div>



                <p>
                    <a
                        href="https://github.com/INTERpol21/samurai"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Cсылка GitHub на этот проект
                    </a>
                </p>

            </div>


        </div>


    );
};

export default About;