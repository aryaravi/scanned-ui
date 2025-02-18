import React from 'react'
import txt from './messages/SPFMessages.json'

const Address = () => {
    return (
        <address className="ma__footer-slim__contact footer_contact" style={{alignItems:'flex-end'}} >
            <div className="ma__footer-slim__contact__item" style={{ alignItems: 'center' }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 36 30"
                    aria-hidden="true"
                >
                    <path
                        d="M33 0H3v19.5h30zm-3 16.5H6V3h24zm3 4.5H3l-3 9h36zm-18.342 7.5l.699-1.5h5.286l.699 1.5z"
                    ></path>
                </svg>
                <a
                    href="https://www.mass.gov/massgov-site-policies" rel="noopener noreferrer" target="_blank"
                    aria-label='site policies'
                >
                    Site Policies
                </a>
            </div>
            <div className="ma__footer-slim__contact__item" style={{ alignItems: 'center' }}>
                <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 32 24"
                >
                    <path
                        d="M16 12.95L.02 0h31.961zM0 20.08V3.42l8.767 7.1zM32 3.42v16.66l-8.767-9.56zM21.157 12.2L16 16.38l-5.157-4.18L.029 24h31.942z"
                    ></path>
                </svg>
                <span className="ma__email">
                    <a href="/VGPortal5/ContactUs" rel="noopener noreferrer" target="_blank" aria-label="contact" className="ma__email__email">
                        Contact Us
                    </a>
                </span>
            </div>
            <div className="ma__footer-slim__contact__item" style={{ alignItems: 'center' }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 33 37"
                    aria-hidden="true"
                >
                    <path
                        d="M20.841 35.51C9.798 40.57-7.343 7.19 3.451 1.56L6.609 0l5.235 10.23-3.121 1.54c-3.281 1.77 3.553 15.14 6.909 13.51.136-.06 3.083-1.51 3.094-1.52l5.278 10.2c-.012.01-2.982 1.47-3.163 1.55zm.399-29.23a9.49 9.49 0 016.376 11.81l-2.69-.8a6.681 6.681 0 00-.528-5.09 6.65 6.65 0 00-3.962-3.22zM19.838 11a4.542 4.542 0 012.71 2.21c.6 1.11.694 2.35.36 3.48l-4.373-1.31zm2.003-6.74c2.84.85 5.359 2.78 6.881 5.6 1.52 2.82 1.757 5.99.912 8.83l2.758.83a14.45 14.45 0 00-1.141-11.03 14.41 14.41 0 00-8.587-6.99z"
                    ></path>
                </svg>
                <span className="ma__phone-number">
                    <a href="tel:1-800-421-0938" rel="noopener noreferrer" target="_blank" className="ma__phone-number__number" aria-label="phonenumber">
                        (800) 421-0938
                    </a>
                </span>
            </div>
            <div className="ma__footer-slim__contact__item" style={{ alignItems: 'center' }}>
                <span className="ma__phone-number">
                    <a href="https://www.mass.gov/policy-statement/eohhs-accessibility-policy" rel="noopener noreferrer" target="_blank" className="ma__phone-number__number" aria-label="phonenumber">
                        Accessibility Policy
                    </a>
                </span>
            </div>
        </address>
    )
}
const FooterSlim = () => {
    return (
        <>
            <footer className="ma__footer-slim footer_slim footer_section" id="footer">
                <div style={{ maxWidth: '1325px', width: '100%' }}>
                    <div className="ma__footer-slim__container ma__container center__footer" style={{ flexDirection: 'column', maxWidth: '1325px', width: '100%', gap: '5px' }}>
                        <div className="ma__site-logo">
                            <a href="https://www.mass.gov/" title="Mass.gov homepage" rel="noopener noreferrer"  >
                                <img
                                    className="ma__image"
                                    alt="Massachusetts state seal"
                                    height="45"
                                    src="https://unpkg.com/@massds/mayflower-assets@12.7.0/static/images/logo/stateseal.png"
                                    width="45"
                                />
                            </a>
                        </div>
                        <div className="ma__footer-slim__container__inner footer_wrapper row">
                            <div className='footer_info col'>
                                <div className="ma__footer-slim__title">
                                    {txt.Title}
                                </div>
                                <div>
                                    {txt.footerAboutVG}
                                </div>
                                <p className="ma__footer-slim__copyright">
                                    &#169; {new Date().getFullYear()}  {txt.commwealthmass}
                                </p>
                            </div>
                            
                            <Address />
                        </div>
                        </div>
                    </div>

            </footer>
        </>
    )
}

export default FooterSlim

