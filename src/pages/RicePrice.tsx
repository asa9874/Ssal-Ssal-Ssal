import React, { useState } from "react";
import MapleHeader from "../components/MapleHeader";
import { MapleCard, MapleInput, MapleButton } from "../components";
import { motion, AnimatePresence } from "framer-motion";

interface Ingredient {
  name: string;
  count: number;
  price: number;
}

interface Recipe {
  id: number;
  itemName: string;
  itemAuctionPrice: number;
  itemCount: number; // 추가: 몇 개 제작할지
  ingredients: Ingredient[];
}

const getDefaultRecipe = (id: number): Recipe => ({
  id,
  itemName: "경험 축적의 비약",
  itemAuctionPrice: 0,
  itemCount: 1,
  ingredients: [
    { name: "재료 최상급 아이템 결정", count: 5, price: 0 },
    { name: "현자의 돌", count: 2, price: 0 },
    { name: "최고급 포션 빈병", count: 1, price: 0 },
    { name: "쥬니퍼 베리씨앗 오일", count: 10, price: 0 },
  ],
});

const RicePrice: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([
    { ...getDefaultRecipe(1) },
  ]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const addRecipe = () => {
    const newId = recipes.length
      ? Math.max(...recipes.map((r) => r.id)) + 1
      : 1;
    setRecipes([...recipes, getDefaultRecipe(newId)]);
  };

  const removeRecipe = (id: number) => {
    setRecipes(recipes.filter((r) => r.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const updateRecipe = (id: number, updater: (r: Recipe) => Recipe) => {
    setRecipes(recipes.map((r) => (r.id === id ? updater(r) : r)));
  };

  return (
    <>
      <MapleHeader />
      <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-orange-50 to-orange-100 py-10">
        <div className="w-full max-w-5xl flex flex-col items-center gap-8">
          <div className="flex w-full justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-orange-400">
              쌀 제작 가격 판단 목록
            </h2>
            <MapleButton onClick={addRecipe}>+ 추가</MapleButton>
          </div>
          <div className="grid grid-cols-1 gap-y-10 w-full">
            <AnimatePresence>
              {recipes.map((recipe) => {
                const totalMaterialCost =
                  recipe.ingredients.reduce(
                    (sum, ing) => sum + ing.count * ing.price,
                    0
                  ) * recipe.itemCount;
                const totalSale = recipe.itemAuctionPrice * recipe.itemCount;
                const afterFee = Math.floor(totalSale * 0.95);
                const profit = afterFee - totalMaterialCost;
                return (
                  <motion.div
                    key={recipe.id}
                    className="cursor-pointer group flex"
                    initial={{ opacity: 0, y: 40, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 40, scale: 0.96 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      duration: 0.4,
                    }}
                    layout
                  >
                    <MapleCard
                      className={`transition-all duration-150 p-8 min-h-[220px] w-full max-w-6xl mx-auto flex flex-col justify-between ${
                        selectedId === recipe.id
                          ? "ring-4 ring-orange-300"
                          : "hover:ring-2 hover:ring-orange-200"
                      }`}
                    >
                      <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center mb-2">
                          <input
                            className="text-xl font-bold text-orange-700 bg-transparent border-b-2 border-orange-200 focus:border-orange-400 outline-none w-72 md:w-[32rem] py-2"
                            value={recipe.itemName}
                            onChange={(e) =>
                              updateRecipe(recipe.id, (r) => ({
                                ...r,
                                itemName: e.target.value,
                              }))
                            }
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div className="flex items-center gap-2">
                            <MapleButton
                              className="ml-2 px-4 py-1 text-xs"
                              onClick={() =>
                                updateRecipe(recipe.id, (r) => ({
                                  ...r,
                                  ingredients: [
                                    ...r.ingredients,
                                    { name: "", count: 1, price: 0 },
                                  ],
                                }))
                              }
                              type="button"
                            >
                              재료 추가
                            </MapleButton>
                            <button
                              className="ml-2 px-4 py-1 rounded-full bg-red-200 hover:bg-red-300 text-red-800 font-bold text-xs transition-all"
                              onClick={() => removeRecipe(recipe.id)}
                              type="button"
                            >
                              카드 삭제
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 text-orange-900 text-lg">
                          경매장 가격:
                          <input
                            type="number"
                            min={0}
                            value={recipe.itemAuctionPrice}
                            onChange={(e) =>
                              updateRecipe(recipe.id, (r) => ({
                                ...r,
                                itemAuctionPrice: Number(e.target.value),
                              }))
                            }
                            className="w-40 rounded-full bg-orange-50 border-2 border-orange-200 px-6 py-2 text-right focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-inner text-lg"
                            onClick={(e) => e.stopPropagation()}
                          />
                          메소 ×
                          <input
                            type="number"
                            min={1}
                            value={recipe.itemCount}
                            onChange={(e) =>
                              updateRecipe(recipe.id, (r) => ({
                                ...r,
                                itemCount: Number(e.target.value),
                              }))
                            }
                            className="w-20 rounded-full bg-orange-50 border-2 border-orange-200 px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-inner text-lg"
                            onClick={(e) => e.stopPropagation()}
                          />
                          개
                        </div>
                        <div className="flex flex-col gap-2 mt-2">
                          <span className="text-orange-700 font-semibold text-base">
                            재료
                          </span>
                          {recipe.ingredients.map((ing, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-8 text-orange-900 text-base"
                            >
                              <input
                                className="w-56 rounded-full bg-orange-50 border-2 border-orange-200 px-6 py-2 text-center focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-inner text-base"
                                value={ing.name}
                                onChange={(e) =>
                                  updateRecipe(recipe.id, (r) => ({
                                    ...r,
                                    ingredients: r.ingredients.map((i, iidx) =>
                                      iidx === idx ? { ...i, name: e.target.value } : i
                                    ),
                                  }))
                                }
                                onClick={(e) => e.stopPropagation()}
                                placeholder="재료명"
                              />
                              <input
                                type="number"
                                min={1}
                                className="w-32 rounded-full bg-orange-50 border-2 border-orange-200 px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-inner text-base"
                                value={ing.count}
                                readOnly
                                tabIndex={-1}
                                style={{
                                  backgroundColor: "#fff7ed",
                                  color: "#b45309",
                                  cursor: "not-allowed",
                                }}
                                onClick={(e) => e.preventDefault()}
                                placeholder="수량"
                              />
                              개 ×
                              <input
                                type="number"
                                min={0}
                                className="w-40 rounded-full bg-orange-50 border-2 border-orange-200 px-4 py-2 text-right focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-inner text-base"
                                value={ing.price}
                                onChange={(e) =>
                                  updateRecipe(recipe.id, (r) => ({
                                    ...r,
                                    ingredients: r.ingredients.map((i, iidx) =>
                                      iidx === idx
                                        ? {
                                            ...i,
                                            price: Number(e.target.value),
                                          }
                                        : i
                                    ),
                                  }))
                                }
                                onClick={(e) => e.stopPropagation()}
                                placeholder="가격"
                              />
                              메소
                              <button
                                className="ml-2 px-3 py-1 rounded-full bg-red-200 hover:bg-red-300 text-red-800 font-bold text-xs transition-all"
                                onClick={() =>
                                  updateRecipe(recipe.id, (r) => ({
                                    ...r,
                                    ingredients: r.ingredients.filter(
                                      (_, iidx) => iidx !== idx
                                    ),
                                  }))
                                }
                                type="button"
                              >
                                삭제
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="text-orange-900 text-base mt-4 font-semibold">
                          예상 판매금: {totalSale.toLocaleString()}메소
                          <span className="ml-4 text-orange-500">
                            (수수료제외 판매금:{" "}
                            <span className="font-bold text-orange-600">
                              {afterFee.toLocaleString()}메소
                            </span>
                            )
                          </span>
                        </div>
                        <div className="text-orange-700 text-base mt-2">
                          총 드는 재료비: {totalMaterialCost.toLocaleString()}메소
                        </div>
                        <div className="text-base mt-2">
                          <span className="text-orange-600 font-bold">
                            예상 이득
                          </span>
                          :{" "}
                          <span className="text-orange-600 font-bold">
                            {afterFee.toLocaleString()}메소
                          </span>{" "}
                          <span className="mx-2">-</span>{" "}
                          <span className="text-red-500 font-bold">
                            {totalMaterialCost.toLocaleString()}메소
                          </span>{" "}
                          <span className="mx-2">=</span>{" "}
                          <span className="text-orange-800 font-bold text-lg">
                            {profit.toLocaleString()}메소
                          </span>
                        </div>
                      </div>
                    </MapleCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          {selectedId &&
            (() => {
              const selectedRecipe = recipes.find((r) => r.id === selectedId);
              if (!selectedRecipe) return null;
              return (
                <div className="w-full max-w-2xl mt-8">
                  <MapleCard className="w-full flex flex-col items-center gap-6">
                    <h2 className="text-2xl font-bold text-orange-400 mb-2">
                      {selectedRecipe.itemName} 제작 가격 판단
                    </h2>
                    <div className="w-full flex flex-col gap-2">
                      <MapleInput
                        label="아이템명"
                        value={selectedRecipe.itemName}
                        onChange={(e) =>
                          updateRecipe(selectedId, (r) => ({
                            ...r,
                            itemName: e.target.value,
                          }))
                        }
                      />
                      <MapleInput
                        label={`${selectedRecipe.itemName} 경매장 가격 (₩)`}
                        type="number"
                        min={0}
                        value={selectedRecipe.itemAuctionPrice}
                        onChange={(e) =>
                          updateRecipe(selectedId, (r) => ({
                            ...r,
                            itemAuctionPrice: Number(e.target.value),
                          }))
                        }
                      />
                    </div>
                    <div className="w-full">
                      <div className="font-bold text-orange-700 mb-2">
                        조합법
                      </div>
                      {selectedRecipe.ingredients.map((ing, idx) => (
                        <div key={idx} className="flex flex-col gap-1 mb-2">
                          <div className="flex gap-2 items-center">
                            <input
                              className="rounded-full bg-orange-50 border-2 border-orange-200 px-3 py-1 w-28 focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-inner"
                              value={ing.name}
                              onChange={(e) =>
                                updateRecipe(selectedId, (r) => ({
                                  ...r,
                                  ingredients: r.ingredients.map((i, iidx) =>
                                    iidx === idx ? { ...i, name: e.target.value } : i
                                  ),
                                }))
                              }
                              placeholder="재료명"
                            />
                            <input
                              className="rounded-full bg-orange-50 border-2 border-orange-200 px-3 py-1 w-16 focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-inner text-center"
                              type="number"
                              min={1}
                              value={ing.count}
                              onChange={(e) =>
                                updateRecipe(selectedId, (r) => ({
                                  ...r,
                                  ingredients: r.ingredients.map((i, iidx) =>
                                    iidx === idx ? { ...i, count: Number(e.target.value) } : i
                                  ),
                                }))
                              }
                              placeholder="수량"
                            />
                            <input
                              className="rounded-full bg-orange-50 border-2 border-orange-200 px-3 py-1 w-24 focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-inner text-right"
                              type="number"
                              min={0}
                              value={ing.price}
                              onChange={(e) =>
                                updateRecipe(selectedId, (r) => ({
                                  ...r,
                                  ingredients: r.ingredients.map((i, iidx) =>
                                    iidx === idx ? { ...i, price: Number(e.target.value) } : i
                                  ),
                                }))
                              }
                              placeholder="경매장 가격"
                            />
                            <button
                              className="ml-2 px-3 py-1 rounded-full bg-red-200 hover:bg-red-300 text-red-800 font-bold text-xs transition-all"
                              onClick={() =>
                                updateRecipe(selectedId, (r) => ({
                                  ...r,
                                  ingredients: r.ingredients.filter((_, iidx) => iidx !== idx),
                                }))
                              }
                              type="button"
                            >
                              삭제
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="w-full mt-4">
                      <div className="font-bold text-orange-700 mb-2">
                        재료별 경매장 가격
                      </div>
                      <ul>
                        {selectedRecipe.ingredients.map((ing, idx) => (
                          <li key={idx} className="mb-1 text-orange-900">
                            {`${
                              ing.name || "(이름없음)"
                            } 경매장 가격 ${ing.price.toLocaleString()}메소 × ${
                              ing.count
                            }개 = ${(
                              ing.price * ing.count
                            ).toLocaleString()}메소`}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="w-full mt-4 text-lg font-bold text-orange-800">
                      예상 이득 :{" "}
                      {(
                        selectedRecipe.itemAuctionPrice -
                        selectedRecipe.ingredients.reduce(
                          (sum, ing) => sum + ing.count * ing.price,
                          0
                        )
                      ).toLocaleString()}
                      메소
                    </div>
                  </MapleCard>
                </div>
              );
            })()}
        </div>
      </div>
    </>
  );
};

export default RicePrice;
