import { Component } from "react";
import styled from "styled-components";
import { useTranslation,Trans } from 'react-i18next'

const lngs = {
    en: { nativeName: 'English' },
    de: { nativeName: 'Deutsch' }
  };
function ColDashBoard(){
    const { t,i18n }= useTranslation();
   
        return(
            <Div>
                <div>
                    {
                        Object.keys(lngs).map((lng) =>(
                            <button type="submit" key={lng} 
                                 onClick={() =>i18n.changeLanguage(lng)}
                                 disabled={i18n.resolvedLanguage === lng}
                            >
                                {lngs[lng].nativeName} 
                            </button>
                        ))
                    }
                </div>
               <div>
                    <Trans i18nKey="description">
                        Edit <code>hahahahaha</code>asdasdasd
                    </Trans>
                    <header>
                        <p>
                            <h3>{t('Thanks')}</h3>  <h3>{t('description')}</h3> 
                        </p>
                    </header>
               </div>
            </Div>
        )
}
export default ColDashBoard;
const Div = styled.div`
  background-color  :#FFF !important;
  color: #000000;
`;