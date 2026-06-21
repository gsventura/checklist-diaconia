import { Phone, MapPin, MessageCircle, Radio } from 'lucide-react';

// Placeholder até definirmos o número oficial de suporte de emergência
const WHATSAPP_SUPPORT_URL = 'https://wa.me/?text=Preciso%20de%20apoio%20de%20emerg%C3%AAncia%20na%20igreja';

export const CodigoVermelho = () => {
    return (
        <div className="emergency-container">
            <section className="emergency-section">
                <h3 className="emergency-section-title">Saúde</h3>
                <div className="emergency-phones">
                    <a href="tel:192" className="emergency-phone samu">
                        <Phone size={22} />
                        <span className="emergency-phone-label">SAMU</span>
                        <span className="emergency-phone-number">192</span>
                    </a>
                    <a href="tel:193" className="emergency-phone resgate">
                        <Phone size={22} />
                        <span className="emergency-phone-label">Resgate</span>
                        <span className="emergency-phone-number">193</span>
                    </a>
                </div>
            </section>

            <section className="emergency-section">
                <h3 className="emergency-section-title">Observações</h3>
                <div className="emergency-card">
                    <p><strong>Falar com calma e clareza:</strong></p>
                    <ul className="emergency-list">
                        <li>"Meu nome é ... e eu falo de Campinas"</li>
                        <li>"O endereço é ... "</li>
                        <li>"Preciso de uma viatura para ... "</li>
                    </ul>
                </div>
            </section>

            <section className="emergency-section">
                <h3 className="emergency-section-title">
                    <Radio size={18} /> Comunicação interna
                </h3>
                <div className="emergency-card">
                    <p>Precisou acionar a PM, avisar a equipe do portão.</p>
                </div>
            </section>

            <section className="emergency-section">
                <h3 className="emergency-section-title">Hospital mais próximo</h3>
                <a
                    href="https://maps.app.goo.gl/1cUpKNX3BEYFw1J56"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="emergency-hospital"
                >
                    <MapPin size={22} />
                    <span>
                        <strong>Hospital Madre Theodora</strong>
                        <span className="emergency-hospital-sub">Abrir rota no mapa</span>
                    </span>
                </a>
            </section>

            <a
                href={WHATSAPP_SUPPORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="emergency-whatsapp"
            >
                <MessageCircle size={22} />
                <span>Suporte de emergência (WhatsApp)</span>
            </a>
        </div>
    );
};
