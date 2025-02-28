'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { fetchData } from '../redux/statsSlice';

import Nav from '../components/main/NavBar';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/Tabs';
import Overview from './overview/OverviewPage';
import Perpetual from './perpetual/PerpetualPage';
import Spot from './spot/SpotPage';
import MoneyMarket from './money-market/MoneyMarketPage';
import Restricted from '../components/main/Restricted';
import { fetchProducts } from '../redux/productsSlice';
import { fetchPrices } from '../redux/pricesSlice';
import { useAppSelector } from '../redux/store';
import { useViewportWidth } from '../hooks/useViewportWidth';

export default function DashboardLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const [interval, setInterval] = useState('31');
  const [path, setPath] = useState(pathname);
  const error = useAppSelector((state) => state.data.error);
  const { isMobile } = useViewportWidth();

  const handleTabChange = (value: string) => {
    setPath(value);
    router.push(`${value}`);
  };

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchData({ interval }));
  }, [dispatch, interval]);

  // fetch products from symbol endpoint
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // fetch prices
  useEffect(() => {
    dispatch(fetchPrices());
  }, [dispatch]);

  return (
    <section>
      {error ? (
        <Restricted />
      ) : (
        <>
          <Nav />
          <div className={`px-${isMobile ? '4' : '10'} mt-4`}>
            <Tabs value={path} onValueChange={handleTabChange}>
              <TabsList>
                <TabsTrigger value="/overview">Overview</TabsTrigger>
                <TabsTrigger value="/perpetual">Perpetual</TabsTrigger>
                <TabsTrigger value="/spot">Spot</TabsTrigger>
                <TabsTrigger value="/money-market">
                  {' '}
                  {isMobile ? 'MM' : 'Money Market'}
                </TabsTrigger>
              </TabsList>
            </Tabs>
            {path === '/overview' && (
              <Overview interval={interval} setInterval={setInterval} />
            )}
            {path === '/perpetual' && (
              <Perpetual interval={interval} setInterval={setInterval} />
            )}
            {path === '/spot' && (
              <Spot interval={interval} setInterval={setInterval} />
            )}
            {path === '/money-market' && (
              <MoneyMarket interval={interval} setInterval={setInterval} />
            )}
          </div>
        </>
      )}
    </section>
  );
}
