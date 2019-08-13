import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
    <div>
        <p>404! not found </p>
        <Link to="/">back</Link>
    </div>
);

export default NotFoundPage;