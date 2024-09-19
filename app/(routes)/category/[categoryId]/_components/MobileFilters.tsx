"use client";
import Button from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";
import { Color, Size } from "@/types";
import { Dialog, Transition } from "@headlessui/react";
import { FilterIcon, Plus, X } from "lucide-react";
import React, { Fragment, useState } from "react";
import Filter from "./Filter";

type Props = {
  sizes: Size[];
  colors: Color[];
};

const MobileFilters = ({ sizes, colors }: Props) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);

  const onClose = () => setOpen(false);

  return (
    <>
      <Button
        onClick={onOpen}
        className="flex items-center gap-x-2 lg:hidden bg-black text-white rounded-full px-4 py-2 shadow-md hover:bg-primary-dark transition-colors duration-300"
      >
        <FilterIcon size={18} />
        Filters
      </Button>

      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="ease-in duration-200"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                <div className="flex items-center justify-between px-4 mb-4">
                  <Dialog.Title className="text-lg font-semibold text-gray-900">
                    Filters
                  </Dialog.Title>
                  <IconButton
                    icon={<X size={20} />}
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                  />
                </div>
                <div className="px-4 space-y-6">
                  <Filter
                    valueKey="sizeId"
                    name="Sizes"
                    data={sizes}
                    className="mb-4"
                  />
                  <Filter valueKey="colorId" name="Colors" data={colors} />
                </div>
                <div className="mt-auto px-4 pt-6">
                  <Button
                    onClick={onClose}
                    className="w-full bg-black text-gray-200 rounded-full py-2 shadow-md hover:bg-gray-900 transition-colors duration-300"
                  >
                    Apply Filters
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MobileFilters;