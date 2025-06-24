import React from 'react';
import { FormattedMessage } from 'react-intl';

function Footer() {
    return (
        <footer className="mt-5 py-3" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="container">
                <div className="text-center">
                    <p className="mb-0" style={{ fontSize: '14px', color: '#666' }}>
                        <FormattedMessage id="footer.contact" />
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;