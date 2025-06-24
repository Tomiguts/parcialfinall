import React from 'react';
import Footer from './footer';
import { Outlet } from 'react-router-dom';

const LayoutWithFooter = () => {
    return (
        // Contenedor principal de la aplicación con layout flexible
        <div className="app-wrapper">
            {/* Área principal donde se renderizan los componentes hijos según la ruta */}
            <main style={{ flex: 1 }}>
                <Outlet /> {/* Aquí se renderizan las rutas hijas */}
            </main>

            {/* Pie de página común a todas las páginas */}
            <Footer />
        </div>
    );
};

// Exporta el layout para usarlo como envoltorio de rutas
export default LayoutWithFooter;
