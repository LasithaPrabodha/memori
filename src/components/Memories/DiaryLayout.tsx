import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {View, FlatList, ListRenderItem, Text, StyleSheet} from 'react-native';
import DiaryItem from './DiaryItem';
import Placeholder from './Placeholder';
import NoMemoryToday from './NoMemoryToday';
import {IDiaryItemWithId} from '../../interfaces/DiaryItem';
import MemoriesService from '../../services/MemoriesService';
import moment from 'moment';

interface MemoryLayoutProps {
  toggleModal: () => void;
  onAddNewMemory: boolean;
}

const DiaryLayout: React.FC<MemoryLayoutProps> = props => {
  const [diaryItems, setDiaryItems] = useState<IDiaryItemWithId[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showMemoryTodayItem, setShowMemoryTodayItem] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const canMomentum = useRef(false);

  const memoriesService = MemoriesService.getInstance();

  const fetchDiaryItems = useCallback(async () => {
    setLoading(true);
    const memories = await memoriesService.loadList(5);
    const canShowTodayQ =
      memories.findIndex(m => moment(m.date).isSame(new Date(), 'day')) === -1;

    setShowMemoryTodayItem(canShowTodayQ);

    setDiaryItems(memories);
    setLoading(false);
  }, [memoriesService]);

  useEffect(() => {
    fetchDiaryItems();
  }, [fetchDiaryItems, props.onAddNewMemory]);

  const onMomentumScrollBegin = () => {
    canMomentum.current = true;
  };

  const onMomentumScrollEnd = () => {
    if (canMomentum.current) {
      if (!loading && !memoriesService.reachedEnd) {
        setLoadingMore(true);
        // small delay to show loading state
        setTimeout(() => loadMoreResults(), 300);
      }
    }

    canMomentum.current = false;
  };

  const loadMoreResults = async () => {
    const newList = await memoriesService.loadMore(5);
    setDiaryItems(newList);
    setLoadingMore(false);
  };

  const deleteMemory = useCallback(
    (id: string, hasImage: boolean) => {
      memoriesService
        .deleteMemory(id, hasImage || false)
        .then(() => fetchDiaryItems());
    },
    [memoriesService, fetchDiaryItems],
  );

  const renderItem: ListRenderItem<IDiaryItemWithId> = useMemo(() => {
    return ({item}) => <DiaryItem memory={item} onDelete={deleteMemory} />;
  }, [deleteMemory]);

  return (
    <FlatList
      data={diaryItems}
      ListHeaderComponent={
        <>
          <View style={{paddingTop: 10}} />
          {showMemoryTodayItem && (
            <NoMemoryToday toggleModal={props.toggleModal} />
          )}
        </>
      }
      ListFooterComponent={
        <View style={{paddingBottom: 5}}>
          {loadingMore && (
            <Text style={styles.footerText}>Loading More...</Text>
          )}
        </View>
      }
      onMomentumScrollBegin={onMomentumScrollBegin}
      onMomentumScrollEnd={onMomentumScrollEnd}
      onRefresh={fetchDiaryItems}
      refreshing={refreshing}
      ListEmptyComponent={<Placeholder />}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      maxToRenderPerBatch={5}
      initialNumToRender={5}
    />
  );
};

const styles = StyleSheet.create({
  footerText: {
    paddingBottom: 50,
    width: '100%',
    textAlign: 'center',
    color: '#bdbddd',
    fontWeight: '600',
  },
});

export default DiaryLayout;
