/* eslint-disable react/prop-types */

export default function Start(props) {
    return (
        <div className="start flex">
            <h1 className="start-main-title">Quizzical</h1>
            <h2 className="start-sub-title">Press to get started!</h2>
            <button className="start-btn" onClick={props.onClick}>Start</button>
        </div>
    );
}