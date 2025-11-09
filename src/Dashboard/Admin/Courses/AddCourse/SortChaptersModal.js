import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Icon } from "@iconify-icon/react";
import { Axios } from "../../../../components/Helpers/Axios";
import { toast } from "react-toastify";

const SortChaptersModal = ({ chapters, onClose, onSorted ,courseId,setShowSortModal ,setChange}) => {
  const [orderedChapters, setOrderedChapters] = useState([]);

  useEffect(() => {
    setOrderedChapters(chapters);
  }, [chapters]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newItems = Array.from(orderedChapters);
    const [movedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, movedItem);

    setOrderedChapters(newItems);
  };

  const handleSave = async () => {
    const payload = orderedChapters.map((ch) => ch.id);
//payload);
const formData = new FormData();
formData.append('chapter_ids' , payload)
    try {
      await Axios.post(`admin/course-chapter/sorting/${courseId}`, formData).then(data=>{
        
        toast.success("Chapters sorted successfully!");
        setShowSortModal(false)
        setChange(prev=>!prev)

      });
    } catch (err) {
      //err);
      toast.error("Failed to sort chapters");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] md:w-[500px] rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Sort Chapters</h2>
          <button onClick={()=>setShowSortModal(false)}  className="text-gray-600 text-2xl">
            &times;
          </button>
        </div>

        <div className="border rounded p-3 max-h-[300px] overflow-y-auto">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="chapters">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {orderedChapters.map((ch, index) => (
                    <Draggable key={ch.id} draggableId={ch.id.toString()} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-3 bg-gray-100 rounded mb-2 flex items-center justify-between shadow-sm"
                        >
                          <span className="text-gray-800 font-medium">{ch.title}</span>
                          <Icon icon="ph:arrows-out-line-horizontal" width={20} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <button
          onClick={handleSave}
          className="mt-4 w-full bg-main text-white py-2 rounded hover:bg-opacity-90 duration-200"
        >
      Sort
        </button>
      </div>
    </div>
  );
};

export default SortChaptersModal;
