import Header from '~/admin/layout/header';

function Default({ Children }) {
    return (
        <div>
            <Header></Header>
            <div>{Children}</div>
            <h1>đây là trang admin</h1>
        </div>
    );
}

export default Default;
