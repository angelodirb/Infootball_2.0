'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, User } from 'lucide-react'

export interface NewsArticle {
  id: number
  title: string
  excerpt: string
  image: string
  author: string
  date: string
  readTime: string
  category: string
}

interface NewsCardProps {
  article: NewsArticle
  featured?: boolean
}

export default function NewsCard({ article, featured = false }: NewsCardProps) {
  if (featured) {
    return (
      <Link href={`/noticias/${article.id}`}>
        <div className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="relative h-96">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <span className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
              {article.category}
            </span>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-green-400 transition-colors">
              {article.title}
            </h3>
            <p className="text-gray-300 mb-4 line-clamp-2">{article.excerpt}</p>
            <div className="flex items-center text-sm text-gray-400 space-x-4">
              <span className="flex items-center">
                <User size={14} className="mr-1" />
                {article.author}
              </span>
              <span className="flex items-center">
                <Clock size={14} className="mr-1" />
                {article.readTime}
              </span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/noticias/${article.id}`}>
      <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            {article.category}
          </span>
        </div>
        
        <div className="p-5">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {article.excerpt}
          </p>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center">
              <User size={12} className="mr-1" />
              {article.author}
            </span>
            <span className="flex items-center">
              <Clock size={12} className="mr-1" />
              {article.readTime}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
