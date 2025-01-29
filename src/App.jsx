import { useEffect, useRef, useState } from 'react';
import './App.css';

function Item({ id }) {
	function dragStartHandler(e) {
		e.dataTransfer.setData('text/plain', JSON.stringify({ id }));
		e.dataTransfer.dropEffect = 'move';
	}
	return <div className="item" draggable onDragStart={dragStartHandler}></div>;
}

function App() {
	const initialState = [{ id: 1 }, { id: 1 }, { id: 1 }, { id: 2 }];
	const [items, setItems] = useState(initialState);
	function dropHandler(e) {
		const data = JSON.parse(e.dataTransfer.getData('text'));
		if (parseInt(e.target.id) !== data.id) {
			const itemsCopy = [...items];
			const findIndex = itemsCopy.findIndex((i) => i.id === data.id);
			itemsCopy[findIndex].id = parseInt(e.target.id);
			setItems(itemsCopy);
		}
	}
	function dragOverHandler(e) {
		e.preventDefault();
	}
	function dragEnterHandler(e) {
		e.preventDefault();
	}
	return (
		<div className="container">
			<section id="1" className="section" onDrop={dropHandler} onDragOver={dragOverHandler} onDragEnter={dragEnterHandler}>
				{items.map((i) => (i.id === 1 ? <Item key={Math.random()} id={i.id} /> : null))}
			</section>
			<section id="2" className="section" onDrop={dropHandler} onDragOver={dragOverHandler} onDragEnter={dragEnterHandler}>
				{items.map((i) => (i.id === 2 ? <Item key={Math.random()} id={i.id} /> : null))}
			</section>
		</div>
	);
}

export default App;
