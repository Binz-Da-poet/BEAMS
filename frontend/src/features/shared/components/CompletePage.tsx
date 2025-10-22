import React from 'react';
import { Link } from 'react-router-dom';
import { useOrderData } from '../hooks/useOrderData';
import { BreadcrumbNavigation } from './BreadcrumbNavigation';

export default function CompletePage(): React.ReactElement {
  const { orderData, currentItemType } = useOrderData();

  const getItemLabel = (value: string): string => {
    switch (value) {
      case 'jacket':
        return 'ジャケット';
      case 'coat':
        return 'コート';
      case 'suit':
        return 'スーツ';
      case 'pants':
        return 'パンツ';
      case 'vest':
        return 'ベスト';
      default:
        return value;
    }
  };

  const getPlanLabel = (value: string): string => {
    switch (value) {
      case 'basic':
        return 'ベーシックオーダー';
      case 'custom':
        return 'カスタムオーダー';
      case 'full':
        return 'フルオーダー';
      default:
        return value;
    }
  };

  return (
    <div className="container-card">
      <BreadcrumbNavigation currentStep={4} />

      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-4">ご注文が完了しました</h1>

        <div className="max-w-md mx-auto bg-slate-50 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">注文内容</h2>
          <div className="space-y-2 text-left">
            <div className="flex justify-between">
              <span className="text-slate-600">アイテム:</span>
              <span className="font-medium">{getItemLabel(orderData.item || currentItemType)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">プラン:</span>
              <span className="font-medium">{getPlanLabel(orderData.plan || 'basic')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">お客様:</span>
              <span className="font-medium">
                {orderData.lastName} {orderData.firstName}
              </span>
            </div>
          </div>
        </div>

        <p className="text-slate-600 mb-8">
          ご注文いただき、ありがとうございました。
          <br />
          担当者よりご連絡いたします。
        </p>

        <div className="flex gap-4 justify-center">
          <Link to="/" className="btn btn--dark w-[200px] inline-flex items-center justify-center h-11 rounded-[10px] bg-slate-900 text-white no-underline">
            ホームに戻る
          </Link>
          <Link to="/drafts" className="btn btn--light w-[200px] inline-flex items-center justify-center h-11 rounded-[10px] bg-slate-100 text-slate-900 no-underline">
            下書き一覧
          </Link>
        </div>
      </div>
    </div>
  );
}
