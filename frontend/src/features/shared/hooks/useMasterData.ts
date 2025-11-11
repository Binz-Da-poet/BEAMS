import { useState, useEffect } from 'react';
import { ApiService, Plan, ItemType, HeavyFabricMaster, PatternMaster, BodyLiningMaster, SleeveLiningMaster, HeavyFabricButtonMaster, OptionMaster } from '@/services/api';

/**
 * Hook to load and manage master data from backend
 */
export const useMasterData = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [itemTypes, setItemTypes] = useState<ItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMasterData = async () => {
      try {
        setLoading(true);
        const [plansData, itemTypesData] = await Promise.all([
          ApiService.getPlans(),
          ApiService.getItemTypes(),
        ]);
        setPlans(plansData);
        setItemTypes(itemTypesData);
        setError(null);
      } catch (err) {
        console.error('Failed to load master data:', err);
        setError('Failed to load master data');
      } finally {
        setLoading(false);
      }
    };

    loadMasterData();
  }, []);

  return { plans, itemTypes, loading, error };
};

/**
 * Hook to load heavy fabrics
 */
export const useHeavyFabrics = (params?: { skip?: number; take?: number; search?: string }) => {
  const [fabrics, setFabrics] = useState<HeavyFabricMaster[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFabrics = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getHeavyFabrics(params);
        setFabrics(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load fabrics:', err);
        setError('Failed to load fabrics');
      } finally {
        setLoading(false);
      }
    };

    loadFabrics();
  }, [params?.skip, params?.take, params?.search]);

  return { fabrics, loading, error };
};

/**
 * Hook to search heavy fabrics
 */
export const useSearchFabrics = () => {
  const [fabrics, setFabrics] = useState<HeavyFabricMaster[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string) => {
    if (!query.trim()) {
      setFabrics([]);
      return;
    }

    try {
      setLoading(true);
      const data = await ApiService.searchHeavyFabrics(query);
      setFabrics(data);
      setError(null);
    } catch (err) {
      console.error('Search failed:', err);
      setError('Search failed');
    } finally {
      setLoading(false);
    }
  };

  return { fabrics, loading, error, search };
};

/**
 * Hook to load patterns
 */
export const usePatterns = () => {
  const [patterns, setPatterns] = useState<PatternMaster[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPatterns = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getPatterns();
        setPatterns(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load patterns:', err);
        setError('Failed to load patterns');
      } finally {
        setLoading(false);
      }
    };

    loadPatterns();
  }, []);

  return { patterns, loading, error };
};

/**
 * Hook to load body linings
 */
export const useBodyLinings = () => {
  const [bodyLinings, setBodyLinings] = useState<BodyLiningMaster[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBodyLinings = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getBodyLinings();
        setBodyLinings(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load body linings:', err);
        setError('Failed to load body linings');
      } finally {
        setLoading(false);
      }
    };

    loadBodyLinings();
  }, []);

  return { bodyLinings, loading, error };
};

/**
 * Hook to load sleeve linings
 */
export const useSleeveLinings = () => {
  const [sleeveLinings, setSleeveLinings] = useState<SleeveLiningMaster[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSleeveLinings = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getSleeveLinings();
        setSleeveLinings(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load sleeve linings:', err);
        setError('Failed to load sleeve linings');
      } finally {
        setLoading(false);
      }
    };

    loadSleeveLinings();
  }, []);

  return { sleeveLinings, loading, error };
};

/**
 * Hook to load buttons
 */
export const useButtons = () => {
  const [buttons, setButtons] = useState<HeavyFabricButtonMaster[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadButtons = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getHeavyFabricButtons();
        setButtons(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load buttons:', err);
        setError('Failed to load buttons');
      } finally {
        setLoading(false);
      }
    };

    loadButtons();
  }, []);

  return { buttons, loading, error };
};

/**
 * Hook to load options
 */
export const useOptions = () => {
  const [options, setOptions] = useState<OptionMaster[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        setLoading(true);
        const data = await ApiService.getOptions();
        setOptions(data);
        setError(null);
      } catch (err) {
        console.error('Failed to load options:', err);
        setError('Failed to load options');
      } finally {
        setLoading(false);
      }
    };

    loadOptions();
  }, []);

  return { options, loading, error };
};

