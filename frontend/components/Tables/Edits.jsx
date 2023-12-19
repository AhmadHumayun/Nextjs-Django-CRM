// EditButtonRenderer.jsx
import React, { useCallback, useState } from 'react';
import { Modal, Button, Input, Text, Divider, Flex } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import axios from 'axios';

const EditButtonRenderer = (params) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [isLoading, setLoading] = useState(false);
// console.log("EditButtonRenderer rendered");
  const onClick = () => {
    // Extracting data from the clicked row (modify this based on your data structure)
    // const { data } = params;
    // console.log('data',params)
    setEditedData(params.data);

    // Opening the modal
    setModalOpen(true);
  };

  const handleClose = () => {
    // Closing the modal
    setModalOpen(false);
  };
  const handleSave = async () => {
    try {
      setLoading(true);
      // Make an HTTP request to updateCustomer endpoint
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/customer/${editedData.customer_id}`, {
        updatedData: editedData,
      });
      // Handle the response, e.g., show a success message
      console.log('Update successful:', response.data);
      // Closing the modal
      setModalOpen(false);
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error('Update failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={onClick} className="edit-button">
        <IconEdit size={14} /> 
      </button>

      <Modal
        title="Edit Data"
        opened={isModalOpen}
        onClose={handleClose}
        size="lg"
        styles={{ body: { padding: 16 } }}
      >
        {Object.keys(editedData).map((key) => (
          <div key={key}>
            <Flex
                // mih={50}
                gap="sm"
                justify="space-between"
                align="center"
                direction="row"
                wrap="wrap"
                >
            <Text
              size="md"
            //   weight={700}
            
            >
              {key}
            </Text>
            <Input
            size='md'
              value={editedData[key]}
              variant="unstyled"
              placeholder='Empty'
              onChange={(event) => setEditedData((prev) => ({ ...prev, [key]: event.target.value }))}
            />
            </Flex>
            <Divider style={{ margin: '3px 0' }} />
          </div>
        ))}

        <Button onClick={handleSave} loading={isLoading}> Save Changes</Button>
      </Modal>
    </>
  );
};

// Memoize the component instance
const MemoizedEditButtonRenderer = React.memo(EditButtonRenderer);

export default MemoizedEditButtonRenderer;
