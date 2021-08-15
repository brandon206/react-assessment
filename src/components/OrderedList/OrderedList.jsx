import React, { useState, useMemo } from "react";
import { FaChevronUp, FaChevronDown, FaTrash } from "react-icons/fa";

import Modal from "../Modal/Modal";

const OrderedList = () => {
  const [items, setItems] = useState([]);
  const [currentSort, setCurrentSort] = useState("");
  const [inputText, setInputText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const sorted = useMemo(() => {
    let sortedItems = [];
    if (!currentSort) {
      return items;
    } else if (currentSort === "asc") {
      sortedItems = [...items].sort((a, b) => {
        a = a.toLowerCase();
        b = b.toLowerCase();
        if (a > b) {
          return 1;
        } else if (a < b) {
          return -1;
        } else {
          return 0;
        }
      });
    } else {
      sortedItems = [...items].sort((a, b) => {
        a = a.toLowerCase();
        b = b.toLowerCase();
        if (a < b) {
          return 1;
        } else if (a > b) {
          return -1;
        } else {
          return 0;
        }
      });
    }
    return sortedItems;
  }, [currentSort, items]);

  const addItem = (inputText) => {
    if (inputText && inputText.length > 0) {
      const trimmedInputText = inputText.trim();
      setItems((items) => [...items, trimmedInputText]);
    }
  };

  const updateInputText = (event) => {
    const { value } = event.target;
    setInputText(value);
  };

  const submit = (event) => {
    event.preventDefault();
    addItem(inputText);
    clearInputText();
  };

  const updateCurrentSort = () => {
    if (currentSort === "" || currentSort === "desc") {
      setCurrentSort("asc");
    } else {
      setCurrentSort("desc");
    }
  };

  const clearInputText = () => {
    setInputText("");
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const reset = () => {
    setItems([]);
    clearInputText();
    hideModal();
  };

  return (
    <>
      {modalVisible ? <Modal reset={reset} hideModal={hideModal} /> : null}
      <div className={modalVisible ? "confirm-bg" : null}>
        <div className="ordered-list">
          <form onSubmit={submit}>
            <input
              className="item-input"
              value={inputText}
              onChange={updateInputText}
              disabled={modalVisible}
              placeholder="Enter text here..."
            ></input>
          </form>
          <div className="button-container">
            <button
              onClick={updateCurrentSort}
              className="sort"
              name="currentSort"
              disabled={modalVisible}
              value={currentSort}
            >
              {currentSort === "asc" ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
          <div className="button-container">
            <button
              onClick={showModal}
              className="reset"
              disabled={modalVisible}
            >
              Clear List <FaTrash />
            </button>
          </div>
          <ul className="item-list">
            {sorted && sorted.length > 0 ? (
              sorted.map((item, index) => {
                return (
                  <li key={index} className="item">
                    {item}
                  </li>
                );
              })
            ) : (
              <li className="item">No items</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default OrderedList;
