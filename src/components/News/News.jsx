import React from 'react';
import style from './News.module.css';

const News = () => {

    return (

        <div className={style.newsBlock}>

            <div>
                <br/>
                interpol21 - userId - 25994
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
                    И смотрите в моем репозитории полный код,
                </div>
                <div>
                    буду рад за поставленные звездочки в нем)
                </div>
                <div>
                    всем спасибо и приятного обучения)
                </div>


                <p>
                    <a
                        href="https://interpol21.github.io/samurai"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Cсылка на этот проект на GitHub
                    </a>
                </p>

            </div>


        </div>


    );
};

export default News;