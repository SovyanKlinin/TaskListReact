import { Outlet } from "react-router-dom";
import Sidebar from './Sidebar';

export default function Layout() {
    return (
        <div style={{
            display: 'flex',
            width: '100vw',
            height: '100vh'
        }}>
            <Sidebar/>
            <main style={{
                width: '100%'
            }}>
                <Outlet />
            </main>
        </div>
    )
}