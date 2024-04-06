import React from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {
  launchImageLibrary,
  ImagePickerResponse,
  ImageLibraryOptions,
} from 'react-native-image-picker';

interface AddPhotoProps {
  image: string;
  addImage: (value: string) => void;
  updateProcessActive: () => void;
}

const AddPhoto: React.FC<AddPhotoProps> = props => {
  const chooseImage = () => {
    props.updateProcessActive();
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };
    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel || response.errorCode) {
        props.updateProcessActive(); // Handle modal continue button state
      } else if (
        !response.didCancel &&
        !response.errorCode &&
        response.assets?.length &&
        response.assets[0].uri
      ) {
        props.addImage(response.assets[0].uri);
        props.updateProcessActive(); // Handle modal continue button state pt. 2
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addPhotoButton} onPress={chooseImage}>
        {props.image !== '' ? (
          <View style={styles.wrapfix}>
            <Image src={props.image} style={styles.addPhotoButtonImage} />
            <Text style={styles.addPhotoButtonTextSelected}>Selected</Text>
          </View>
        ) : (
          <Text style={styles.addPhotoButtonText}>Add Photo</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  addPhotoButton: {
    backgroundColor: '#F0F8F8',
    padding: 10,
    borderRadius: 7.5,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#006565',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoButtonText: {
    color: '#006565',
    fontWeight: '600',
  },
  addPhotoButtonTextSelected: {
    color: '#006565',
    fontWeight: '600',
    marginLeft: 5,
  },
  addPhotoButtonImage: {
    width: 15,
    height: 15,
    borderRadius: 2,
  },
  wrapfix: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});

export default AddPhoto;
